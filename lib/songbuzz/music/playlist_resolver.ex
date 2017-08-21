defmodule Songbuzz.Music.PlaylistResolver do
  @moduledoc """
  Provides resolver functions for `Playlist` objects in the GraphQL API.
  """
  import Ecto.Query, only: [where: 2]
  alias Songbuzz.{Music.Playlist, Repo}

  def all(_args, %{context: %{current_user: %{id: id}}}) do
    {:ok, Repo.all(Playlist)}
  end

  def all(_args, info) do
    {:error, "Not authenticated"}
  end

  def create(args, _info) do
    Songbuzz.Music.create_playlist(args)
  end

  def update(%{id: id, music_playlist: playlist_attrs}, _info) do
    id
    |> Songbuzz.Music.get_playlist!()
    |> Songbuzz.Music.update_playlist(playlist_attrs)
  end

  def delete(%{id: id}, _info) do
    id
    |> Songbuzz.Music.get_playlist!()
    |> Songbuzz.Music.delete_playlist()
  end
end
