import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";

// Credential fields across the app deliberately avoid <input type="password">.
// Browsers key their "Save password?" prompt, their password manager and their
// autofill heuristics off that type, so a sensitive application that must not
// have credentials persisted by the browser cannot use it. The field is a plain
// text input instead, masked visually with the CSS `text-security` property
// (see `.masked-input` in src/index.css), which keeps the dots a user expects.
//
// Pass `revealed` to unmask the value for a show/hide-password toggle — the
// input type never changes, only the mask.
const MaskedPasswordInput = forwardRef(
  ({ revealed = false, className = "", ...props }, ref) => (
    <Form.Control
      {...props}
      ref={ref}
      type="text"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      // Keeps third-party managers (LastPass, 1Password, Bitwarden) from
      // re-adding the save prompt this field exists to avoid.
      data-lpignore="true"
      data-1p-ignore="true"
      data-bwignore="true"
      className={`${className} ${revealed ? "" : "masked-input"}`.trim()}
    />
  ),
);

MaskedPasswordInput.displayName = "MaskedPasswordInput";

export default MaskedPasswordInput;
