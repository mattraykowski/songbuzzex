defmodule Songbuzz.Repo.Migrations.CreateSongbuzz.Music.Playlist do
  use Ecto.Migration

  def change do
    create table(:music_playlists) do
      add :title, :string
       add :accounts_user_id, references(:accounts_users, on_delete: :nothing)

      timestamps()
    end

    create index(:music_playlists, [:accounts_user_id])
  end
end
