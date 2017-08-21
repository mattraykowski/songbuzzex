defmodule Songbuzz.Accounts.User do
  @moduledoc """
  Defines the `User` schema, changesets, and queries.
  """
  use Ecto.Schema
  import Ecto.Changeset
  alias Songbuzz.Accounts.User


  schema "accounts_users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    has_many :music_playlists, Songbuzz.Music.Playlist, foreign_key: :accounts_user_id

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :first_name, :last_name, :password])
    |> validate_required([:email, :first_name, :last_name])
    |> put_password_hash()
  end

  @doc false
  def register_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :first_name, :last_name, :password])
    |> validate_required([:email, :first_name, :last_name, :password])
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
      _ ->
        changeset
    end
  end
end
