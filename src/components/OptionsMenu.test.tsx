import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OptionsMenu from "./OptionsMenu";

const defaultProps = {
  open: true,
  locale: "fr" as const,
  mode: "mixed" as const,
  difficulty: "average" as const,
  locationCode: "75",
  haptics: true,
  seed: "TEST",
  onOpenChange: vi.fn(),
  onLocaleChange: vi.fn(),
  onModeChange: vi.fn(),
  onDifficultyChange: vi.fn(),
  onLocationChange: vi.fn(),
  onHapticsChange: vi.fn(),
  onResetRequest: vi.fn(),
  onNewCardRequest: vi.fn()
};

describe("OptionsMenu location setup", () => {
  it("resolves manual country input as the player types", () => {
    render(<OptionsMenu {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Code département ou pays"), { target: { value: "FIN" } });

    expect(screen.getByText("FIN - Finlande")).toBeTruthy();
  });

  it("rejects F as a manual location code", () => {
    render(<OptionsMenu {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Code département ou pays"), { target: { value: "F" } });

    expect(screen.getByText("Aucun code valide")).toBeTruthy();
  });

  it("requests a confirmed location change for valid manual input", () => {
    const onLocationChange = vi.fn();
    render(<OptionsMenu {...defaultProps} onLocationChange={onLocationChange} />);

    fireEvent.change(screen.getByPlaceholderText("Code département ou pays"), { target: { value: "33" } });
    fireEvent.click(screen.getByRole("button", { name: "Confirmer" }));

    expect(onLocationChange).toHaveBeenCalledWith("33");
  });
});
