import "./singleInputField.css";

export default function SingleInputField({
  value,
  onChange,
  onKeyDown,
  placeholder = "",
  enterText = "ENTER",
  nameText = "YOUR NAME",
  disabled = false,
  className = "",
}) {
  return (
    <div className={`futuristic-input ${className}`}>
      <div className="futuristic-input-space">
        <div className="futuristic-input-space-2" />
        <div className="triangle-input-up" />
        <div className="triangle-input-bar2" />
        <div className="triangle-input-left" />
        <div className="futuristic-input-space-2" />
        <div className="triangle-input-right2" />
        <div className="triangle-input-bar3" />
      </div>

      <div className="futuristic-input-space">
        <div className="triangle-input-up" />
        <div className="triangle-input-bar" />
      </div>

      <div className="futuristic-input-space">
        <div className="triangle-input-bar" />

        <input
          type="text"
          name="name"
          className="input"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          aria-label={placeholder || "Enter your name"}
          disabled={disabled}
        />

        <p className="futuristic-input-enter">{enterText}</p>
        <p className="futuristic-input-name">{nameText}</p>
      </div>

      <div className="futuristic-input-space">
        <div className="triangle-input-bar" />
      </div>

      <div className="futuristic-input-space">
        <div className="triangle-input-bar" />
        <div className="triangle-input-down" />
      </div>

      <div className="futuristic-input-space2">
        <div className="triangle-input-bar3" />
        <div className="triangle-input-left2" />
        <div className="futuristic-input-space-2" />
        <div className="triangle-input-right" />
        <div className="triangle-input-bar2" />
        <div className="triangle-input-down" />
        <div className="futuristic-input-space-2" />
      </div>
    </div>
  );
}