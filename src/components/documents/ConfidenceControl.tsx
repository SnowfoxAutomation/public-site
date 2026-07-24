import { documentsContent } from "@/content/documents";

import { confidenceControlVariants } from "./ConfidenceControl.variants";

type ConfidenceControlProps = {
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
};

export function ConfidenceControl({
  value,
  disabled,
  onChange,
}: ConfidenceControlProps) {
  return (
    <fieldset
      className={confidenceControlVariants.fieldset}
      disabled={disabled}
    >
      <div
        className={confidenceControlVariants.header}
      >
        <legend
          className={confidenceControlVariants.label}
        >
          {documentsContent.confidence.label}
        </legend>
        <output
          className={confidenceControlVariants.value}
          htmlFor="minimum-confidence"
        >
          {value.toFixed(2)}
        </output>
      </div>

      <input
        id="minimum-confidence"
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        className={confidenceControlVariants.input}
        aria-describedby="minimum-confidence-guidance"
        onChange={(event) =>
          onChange(Number(event.currentTarget.value))
        }
      />

      <div
        className={confidenceControlVariants.scale}
        aria-hidden="true"
      >
        <span>0.00</span>
        <span>1.00</span>
      </div>

      <p
        id="minimum-confidence-guidance"
        className={
          confidenceControlVariants.guidance
        }
      >
        {documentsContent.confidence.guidance}
      </p>
    </fieldset>
  );
}
