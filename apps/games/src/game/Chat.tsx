import { useEffect, useRef, useState } from 'preact/hooks';
import { MAX_CHAT } from '../shared/protocol.ts';
import { chatText, t } from './i18n.ts';
import { chats, send } from './store.ts';

export function Chat({ placeholder, disabled = false }: { placeholder?: string; disabled?: boolean }) {
  const [text, setText] = useState('');
  const list = useRef<HTMLOListElement>(null);
  const messages = chats.value;

  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const submit = (e: Event) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    send({ t: 'chat', text: value });
    setText('');
  };

  return (
    <section class="chat" aria-label={t('chat')}>
      <ol class="chat-list" ref={list} aria-live="polite">
        {messages.map((m) =>
          m.kind === 'sys' ? (
            <li class={`msg msg-sys msg-${m.key}`}>{chatText(m)}</li>
          ) : (
            <li class={`msg${m.secret ? ' msg-secret' : ''}`}>
              <b>{m.name}:</b> {m.text}
            </li>
          ),
        )}
      </ol>
      <form class="chat-form" onSubmit={submit}>
        <input
          value={text}
          onInput={(e) => setText(e.currentTarget.value)}
          maxLength={MAX_CHAT}
          placeholder={placeholder ?? t('say')}
          aria-label={placeholder ?? t('say')}
          disabled={disabled}
          autocomplete="off"
          enterkeyhint="send"
        />
        <button type="submit" class="btn" disabled={disabled}>
          {t('send')}
        </button>
      </form>
    </section>
  );
}
