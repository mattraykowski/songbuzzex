defmodule Songbuzz.Accounts.UserResolver do
  @moduledoc """
  Provides resolver functions for `User` objects in the GraphQL API.
  """
  alias Songbuzz.{Accounts, Accounts.User, Repo}

  def all(_args, _info) do
    {:ok, Repo.all(User)}
  end

  def find(%{id: id}, _info) do
    case Accounts.get_user(id) do
      nil -> {:error, "User id #{id} not found."}
      user -> {:ok, user}
    end
  end

  def update(%{id: id, accounts_user: user_attrs}, _info) do
    id
    |> Songbuzz.Accounts.get_user!()
    |> Songbuzz.Accounts.update_user(user_attrs)
  end

  def login(params, _info) do
    with {:ok, user} <- Songbuzz.Accounts.Session.authenticate(params),
         {:ok, jwt, _} <- Guardian.encode_and_sign(user, :access) do
      {:ok, %{token: jwt}}
    end
  end

  def signup(params, _info) do
    with {:ok, user} <- Songbuzz.Accounts.create_user(params),
         {:ok, jwt, _} <- Guardian.encode_and_sign(user, :access) do
      {:ok, %{token: jwt}}
    end
  end
end
