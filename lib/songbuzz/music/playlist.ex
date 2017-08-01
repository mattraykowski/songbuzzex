defmodule Songbuzz.Music.Playlist do
  use Ecto.Schema
  import Ecto.Changeset
  alias Songbuzz.{Music.Playlist, Accounts.User}

  @fields ~w(accounts_user_id title)a

  schema "music_playlists" do
    field :title, :string
    belongs_to :accounts_user, User

    timestamps()
  end

  @doc false
  def changeset(%Playlist{} = playlist, attrs) do
    playlist
    |> cast(attrs, @fields)
    |> validate_required(@fields)
    |> cast_assoc(:accounts_user)
  end
end
