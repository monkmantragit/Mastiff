/**
 * Spam trap. Hidden from people and assistive tech; bots that fill every input fill this
 * one too, and the API silently drops those submissions.
 */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Leave this field empty
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
