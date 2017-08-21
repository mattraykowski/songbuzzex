defmodule Songbuzz.Schema.Types do
  @moduledoc """
  Defines the Absinthe GraphQL types.
  """
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Songbuzz.Repo

  object :accounts_user do
    field :id, :id
    field :email, :string
    field :first_name, :string
    field :last_name, :string

    field :playlists, list_of(:music_playlist), resolve: assoc(:music_playlists)
  end

  object :music_playlist do
    field :id, :id
    field :title, :string

    field :user, :accounts_user, resolve: assoc(:accounts_users)
  end

  object :session do
    field :token, :string
  end

end
