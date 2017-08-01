defmodule Songbuzz.Accounts.Session do
  alias Songbuzz.{Accounts, Accounts.User}


  def authenticate(params) do
    user = Accounts.get_user_by_email(params.email)
    case check_password(user, params.password) do
      true -> {:ok, user}
      _ -> {:error, "Incorrect login"}
    end
  end

  def check_password(user, password) do
    case user do
      nil -> false
      _ -> Comeonin.Bcrypt.checkpw(password, user.password_hash)
    end
  end
end
