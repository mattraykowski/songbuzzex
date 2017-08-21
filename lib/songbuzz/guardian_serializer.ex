defmodule Songbuzz.GuardianSerializer do
  @moduledoc """
  Used for converting `Songbuzz.Accounts.User` to and from tokens for use with `Guaurdian`.
  """
  @behaviour Guardian.Serializer

  alias Songbuzz.{Accounts.User, Repo}

  def for_token(%User{} = user), do: {:ok, "User:#{user.id}"}
  def for_token(_), do: {:error, "Unknown resource type"}

  def from_token("User:" <> id), do: {:ok, Repo.get(User, id)}
  def from_token(_), do: {:error, "Unknown resource type"}
end
