# Chat

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## Chat

Chat is a family of composable primitives for building AI and human chat experiences. Combine ChatLayout, ChatMessageList, ChatMessage, bubbles, system messages, tool calls, tokenized text, and ChatComposer to assemble complete conversations without reimplementing sender-aware layout, density, scrolling, or composer behavior.

**Nên**

- Compose messages using MessageList > Message > Bubble for consistent sender-aware styling and density.
- Set the density prop to control spacing globally: compact for sidebars, balanced for most views, spacious for long-form reading. Individual messages can override.
- Use gap when top-level rows are independent (for example, LLM tool events or streamed blocks) and list spacing needs to be tuned separately from density.
- Use the group prop on bubbles (first, middle, last) when a single sender sends multiple consecutive messages; it tightens corner radius to visually connect them.
- Use ChatSystemMessage with variant="divider" for date separators and default for inline status notices like joins, leaves, or topic changes.
- Put name on the first bubble and metadata on the last bubble in a message so they align with the bubble's inline padding.
- Wrap custom in-message content (cards, attachments, citations) in a ghost bubble so it aligns with the bubble text column; add width="100%" when it should span the full message column instead of the default bubble width cap.
- Provide an emptyState prop so new users see a clear prompt to start a conversation instead of a blank screen.
- Use the ghost bubble variant for AI-style responses that show rich content like code blocks or markdown without a visible boundary.

**Không nên**

- Don't use ChatSystemMessage for sender content; it has no avatar, alignment, or bubble. Use ChatMessage with a sender role instead.
- Don't put long or multi-line content in a system message; keep it to a single short sentence. If you need more, use a bubble or a card.
- Don't nest ChatMessage inside another ChatMessage; each message is a standalone article element with its own sender context.
- Don't apply a fixed height directly on the message list; wrap it in a sized container and let the list fill with flex: 1.
- Don't mix filled and ghost bubble variants within the same sender's messages; pick one style per side and use it consistently.
- Don't place metadata or names on both the bubble and the message wrapper; pick one based on whether the content has a bubble boundary.

## ChatDictationButton

ChatDictationButton is a toggle button that starts and stops voice dictation inside a chat composer. It pairs with useChatDictation to show a microphone icon when idle and animated frequency bars when listening. Place it in the sendActions slot of ChatComposer.

**Nên**

- Place the dictation button in the sendActions slot of ChatComposer so it sits next to the send button where users expect voice input controls.
- Pass an inputRef to useChatDictation so interim transcripts appear as ghost text in the composer input while the user speaks.
- Enable hasSounds on useChatDictation to give users audio feedback when dictation starts and stops. This is especially helpful when the button's visual change is subtle.

**Không nên**

- Don't use the dictation button outside a chat composer context. It's designed for the composer's send-action layout, not as a standalone recording control.
- Don't forget to handle the unsupported case. The button hides itself by default when the browser lacks SpeechRecognition, but you should still design the composer to work without it.

## ChatToolCalls

ChatToolCalls displays tool or function call invocations from an LLM response. Pass an array of calls and the component handles the rest: a single call renders inline, while multiple calls collapse into a summary with the latest call visible at the surface. Use it anywhere an AI agent shows what actions it took.

**Nên**

- Include a target string on every call so the user can see what the tool acted on: a file path, a shell command, or a search query.
- Show a duration on completed calls so users can judge which tools are slow and understand why a response took time.
- Provide a group label when the automatic count does not explain what the calls represent.
- Provide resultDetail with a code block for calls that produce output (diffs for edits, terminal output for shell commands) so users can inspect results inline.
- Set a unique key on each call item when streaming so React can animate additions without re-mounting completed rows.

**Không nên**

- Don't omit the status field. Without it the call defaults to complete, which is misleading for calls that are still running or have failed.
- Don't display tool calls outside a chat message context; they are designed to sit inside an assistant message, not as standalone UI.
- Don't use custom wrappers around individual calls; the component handles single vs. grouped layout automatically based on the array length.

## useChatDictation

Voice input for a chat composer. It wraps speech recognition with microphone level, start and stop cues, and optional interim text in a ChatComposerInput. Check isSupported before offering the control. A browser without speech recognition reports false and does not listen. Sustained loud speech turns the transcript to upper case.

**Nên**

- Pass inputRef when the words should appear in the composer. The hook inserts each final transcript there and still calls onResult.
- Disable the control when isSupported is false, and say that this browser cannot take voice input.
- Handle onError. It is the only signal that microphone permission was refused.

**Không nên**

- Call the browser SpeechRecognition API beside this hook. Use useSpeechRecognition only when the composer behavior is not wanted.

## useChatPasteAsToken

Turns a long plain-text paste into a token chip in a ChatComposerInput. Short pastes are left for the composer to insert. Pass the returned object as pasteAsToken. The default threshold is 200 characters.

**Nên**

- Keep the same ref on the composer handle and on this hook, so insertToken reaches that input.
- Pass pasteAsToken={false} when every paste should stay inline text.

**Không nên**

- Insert the long paste as characters and also as a token. Returning true tells the composer the paste is already handled.

## useSpeechRecognition

A headless speech-recognition control. It does not write into a composer. Read the transcript from interimTranscript and onResult, and draw your own UI from isListening and volume. Check isSupported first. useChatDictation adds composer interim text and start and stop cues on top of this hook.

**Nên**

- Hide or disable the control when isSupported is false.
- Use onResult for the committed transcript. interimTranscript changes while the person is still speaking.

**Không nên**

- Use this hook to fill a ChatComposerInput. useChatDictation owns that interim text.
