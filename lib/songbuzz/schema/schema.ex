defmodule Songbuzz.Schema do
  @moduledoc """
  Defines the Absinthe GraphQL schema.
  """
  use Absinthe.Schema
  import_types Songbuzz.Schema.Types

  input_object :update_playlist_params do
    field :title, non_null(:string)
    field :accounts_user_id, non_null(:integer)
  end

  input_object :update_user_params do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :password, :string
  end

  query do
    field :music_playlists, list_of(:music_playlist) do
      resolve &Songbuzz.Music.PlaylistResolver.all/2
    end

    field :accounts_users, list_of(:accounts_user) do
      resolve &Songbuzz.Accounts.UserResolver.all/2
    end

    field :accounts_user, type: :accounts_user do
      arg :id, non_null(:id)
      resolve &Songbuzz.Accounts.UserResolver.find/2
    end
  end

  mutation do
    field :update_accounts_user, type: :accounts_user do
      arg :id, non_null(:id)
      arg :accounts_user, :update_user_params

      resolve &Songbuzz.Accounts.UserResolver.update/2
    end

    field :create_music_playlist, type: :music_playlist do
      arg :title, non_null(:string)
      arg :accounts_user_id, non_null(:integer)

      resolve &Songbuzz.Music.PlaylistResolver.create/2
    end

    field :update_music_playlist, type: :music_playlist do
      arg :id, non_null(:id)
      arg :music_playlist, :update_playlist_params

      resolve &Songbuzz.Music.PlaylistResolver.update/2
    end

    field :delete_music_playlist, type: :music_playlist do
      arg :id, non_null(:id)

      resolve &Songbuzz.Music.PlaylistResolver.delete/2
    end

    field :login, type: :session do
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &Songbuzz.Accounts.UserResolver.login/2
    end

    field :signup, type: :session do
      arg :email, non_null(:string)
      arg :first_name, non_null(:string)
      arg :last_name, non_null(:string)
      arg :password, non_null(:string)

      resolve &Songbuzz.Accounts.UserResolver.signup/2
    end
  end
end
