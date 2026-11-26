# utility

Trích từ tài liệu Astryx (tiếng Anh). Tên prop là của Astryx; khi viết bằng shadcn thì giữ ý của luật. Nếu trái với `../design-rules.md` thì theo design-rules.

## useDevWarning

Fires a dev-only "Component: message" console warning once per mount while the condition holds. It is the render-safe way for a component to flag misuse: warning straight from the render body repeats on every render, and gating it with state adds a re-render, so this uses a ref and an effect instead. For a warning outside a component, use the imperative devWarn utility.

**Nên**

- Say what is wrong and what the builder should do instead; the message is the whole value of the warning.
- Warn about combinations the types cannot express, such as two mutually exclusive props being set together.

**Không nên**

- Use it for anything a user could see or for runtime error handling; it is stripped from production builds.

## useMergedRefs

Combines multiple object or callback refs into one stable callback ref. Use it when a component must forward a consumer ref while also attaching internal refs. Unlike calling mergeRefs during render, the callback identity stays stable across unrelated rerenders, so React does not detach and reattach the element.

**Nên**

- Use useMergedRefs when one element must receive both a forwarded ref and one or more internal refs.

**Không nên**

- Call mergeRefs directly in a JSX ref prop; that creates a new callback on every render and forces unnecessary detach and attach work.
