import { render, screen } from "@testing-library/react";

import { LoginForm } from "@/components/admin/login-form";

jest.mock("@/actions/auth", () => ({
  loginAdmin: jest.fn(),
}));

describe("LoginForm", () => {
  it("renders accessible credential fields and submit control", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "autocomplete",
      "email",
    );
    expect(screen.getByLabelText("Senha")).toHaveAttribute(
      "autocomplete",
      "current-password",
    );
    expect(screen.getByRole("button", { name: "Entrar" })).toBeEnabled();
  });
});
