/* app.js — geteiltes Verhalten für beide Design-Varianten.
 *
 * WICHTIG: Die Chatbot-Fetch-Logik (-> /.netlify/functions/chat) und die
 * Formspree-Logik sind funktional unveraendert. Neu ist nur die Praesentation:
 * Chat + Kontakt liegen jetzt in Modals ("Fenstern"), Fabi bekommt Avatar-States.
 *
 * DOM-Vertrag (muss in jeder Varianten-HTML vorhanden sein):
 *   [data-open-chat]     -> oeffnet Chat-Modal (Hero-Button + FAB)
 *   [data-open-contact]  -> oeffnet Kontakt-Modal
 *   [data-close-modal]   -> schliesst das umgebende Modal
 *   [data-goto="id"]     -> schliesst Modal + scrollt zu #id
 *   .modal  mit id #chat-modal / #contact-modal (role="dialog" aria-modal="true")
 *   #chatverlauf, #quick-replies (Buttons mit [data-quick]), #chatcontent, #chatbutton
 *   #contactform (Felder: name, email, phone, message), #contact-thanks
 */
(function () {
  'use strict';

  var AV = { normal: 'images/fabi-normal-128.webp', thinking: 'images/fabi-thinking-128.webp' };
  var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
  var lastTrigger = null;

  /* ---------------- Modal-System ---------------- */
  function openModal(modal, trigger) {
    if (!modal) return;
    var current = document.querySelector('.modal.is-open');
    if (current && current !== modal) {
      current.classList.remove('is-open');
      current.setAttribute('aria-hidden', 'true');
    } else if (!current) {
      lastTrigger = trigger || document.activeElement;
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open');
    var ft = modal.querySelector('[data-autofocus]') || modal.querySelector(FOCUSABLE);
    if (ft) setTimeout(function () { ft.focus(); }, 40);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal.is-open')) {
      document.documentElement.classList.remove('modal-open');
    }
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  }

  function trapTab(e, modal) {
    if (e.key !== 'Tab') return;
    var nodes = Array.prototype.slice.call(modal.querySelectorAll(FOCUSABLE))
      .filter(function (n) { return n.offsetParent !== null; });
    if (!nodes.length) return;
    var first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openChat(trigger) {
    openModal(document.getElementById('chat-modal'), trigger);
    var inp = document.getElementById('chatcontent');
    if (inp) setTimeout(function () { inp.focus(); }, 80);
    scrollChat();
  }

  /* ---------------- Event-Delegation ---------------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var openChatEl = t.closest('[data-open-chat]');
    var openContactEl = t.closest('[data-open-contact]');
    var closeEl = t.closest('[data-close-modal]');
    var gotoEl = t.closest('[data-goto]');
    var qr = t.closest('[data-quick]');

    if (openChatEl) { e.preventDefault(); openChat(openChatEl); }
    else if (openContactEl) { e.preventDefault(); openModal(document.getElementById('contact-modal'), openContactEl); }
    else if (closeEl) { e.preventDefault(); closeModal(closeEl.closest('.modal')); }
    else if (gotoEl) {
      e.preventDefault();
      var m = gotoEl.closest('.modal'); if (m) closeModal(m);
      var target = document.getElementById(gotoEl.getAttribute('data-goto'));
      if (target) setTimeout(function () { target.scrollIntoView({ behavior: 'smooth' }); }, 120);
    }
    else if (qr) { e.preventDefault(); quickReply(qr.getAttribute('data-quick')); }
    else if (t.classList && t.classList.contains('modal__backdrop')) { closeModal(t.closest('.modal')); }
  });

  document.addEventListener('keydown', function (e) {
    var open = document.querySelector('.modal.is-open');
    if (!open) return;
    if (e.key === 'Escape') { closeModal(open); return; }
    trapTab(e, open);
  });

  /* ---------------- Chat (Fetch unveraendert) ---------------- */
  var quickShown = true;
  var greeting = 'Hi, ich bin Fabi! Ich beantworte alle Fragen rund ums Coaching von Fabian. Was kann ich fuer dich tun?';
  var messages = [
    { role: 'system', content: (typeof CONFIG !== 'undefined' ? CONFIG.systemPrompt : '') },
    { role: 'assistant', content: greeting }
  ];

  function chatlog() { return document.getElementById('chatverlauf'); }
  function scrollChat() { var c = chatlog(); if (c) c.scrollTop = c.scrollHeight; }

  function makeBotRow(content, isHTML) {
    var row = document.createElement('div');
    row.className = 'msg msg--bot';
    var av = document.createElement('img');
    av.className = 'msg__avatar'; av.src = AV.normal; av.alt = ''; av.width = 30; av.height = 30;
    av.setAttribute('aria-hidden', 'true');
    var bubble = document.createElement('div');
    bubble.className = 'msg__bubble';
    if (isHTML) bubble.innerHTML = content; else bubble.textContent = content;
    row.appendChild(av); row.appendChild(bubble);
    return row;
  }
  function makeUserRow(text) {
    var row = document.createElement('div');
    row.className = 'msg msg--user';
    var bubble = document.createElement('div');
    bubble.className = 'msg__bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    return row;
  }

  function addMessage(sender, text) {
    var replaced = false;
    if (text.indexOf('KONTAKT_FORMULAR') !== -1) {
      text = text.replace('KONTAKT_FORMULAR', '<button type="button" class="chip" data-open-contact>Kontaktformular oeffnen</button>');
      replaced = true;
    }
    if (text.indexOf('TERMINBUCHUNG') !== -1) {
      text = text.replace('TERMINBUCHUNG', '<button type="button" class="chip" data-goto="buchung">Zur Terminbuchung</button>');
      replaced = true;
    }
    var row = sender === 'bot' ? makeBotRow(text, replaced) : makeUserRow(text);
    chatlog().appendChild(row);
    scrollChat();
  }

  function sendMessage() {
    var input = document.getElementById('chatcontent');
    if (!input) return;
    var val = input.value.trim();
    if (!val) return;
    input.value = '';

    if (quickShown) { var q = document.getElementById('quick-replies'); if (q) q.remove(); quickShown = false; }

    addMessage('user', val);
    messages.push({ role: 'user', content: val });

    var thinking = document.createElement('div');
    thinking.className = 'msg msg--bot';
    thinking.innerHTML = '<img class="msg__avatar" src="' + AV.thinking + '" alt="" width="30" height="30" aria-hidden="true">' +
      '<div class="msg__bubble msg__bubble--typing" aria-label="Fabi denkt nach"><span></span><span></span><span></span></div>';
    chatlog().appendChild(thinking);
    scrollChat();

    fetch('/.netlify/functions/chat', { method: 'POST', body: JSON.stringify({ messages: messages }) })
      .then(function (r) { if (!r.ok) throw new Error('Status ' + r.status); return r.json(); })
      .then(function (data) {
        var botMessage = data.choices[0].message.content;
        thinking.remove();
        addMessage('bot', botMessage);
        messages.push({ role: 'assistant', content: botMessage });
      })
      .catch(function () {
        thinking.remove();
        addMessage('bot', 'Ein Fehler ist aufgetreten. Versuche es nochmal.');
      });
  }

  function quickReply(message) {
    var q = document.getElementById('quick-replies'); if (q) q.remove(); quickShown = false;
    var input = document.getElementById('chatcontent');
    if (input) input.value = message;
    sendMessage();
  }

  /* ---------------- Kontaktformular (Formspree unveraendert) ---------------- */
  function submitContact(e) {
    e.preventDefault();
    var form = document.getElementById('contactform');
    var thanks = document.getElementById('contact-thanks');
    var fd = new FormData(form);
    fetch('https://formspree.io/f/' + CONFIG.formspreeId, {
      method: 'POST', body: fd, headers: { Accept: 'application/json' }
    })
      .then(function (r) { if (!r.ok) throw new Error('Status ' + r.status); })
      .then(function () {
        form.hidden = true;
        thanks.textContent = 'Danke! Ich melde mich so bald wie moeglich bei dir.';
        thanks.hidden = false;
      })
      .catch(function () {
        thanks.textContent = 'Das hat nicht geklappt. Versuch es bitte erneut oder schreib direkt an fabian@beispiel.de.';
        thanks.hidden = false;
      });
  }

  /* ---------------- Wiring ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var sendBtn = document.getElementById('chatbutton');
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    var input = document.getElementById('chatcontent');
    if (input) input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); sendMessage(); }
    });
    var form = document.getElementById('contactform');
    if (form) form.addEventListener('submit', submitContact);
    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

    // Scroll-Reveal (nur wenn [data-reveal] existiert, z.B. Variante B)
    var reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length) {
      var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || !('IntersectionObserver' in window)) {
        reveals.forEach(function (el) { el.classList.add('is-in'); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
        reveals.forEach(function (el) { io.observe(el); });
        // Sicherheitsnetz: falls der Browser keine IO-Callbacks liefert, nach 2.5s trotzdem alles zeigen
        setTimeout(function () { reveals.forEach(function (el) { el.classList.add('is-in'); }); }, 2500);
      }
    }
  });
})();
