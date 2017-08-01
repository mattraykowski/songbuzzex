defmodule Songbuzz.Web.PlaylistView do
  use Songbuzz.Web, :view
  alias Songbuzz.Web.PlaylistView

  def render("index.json", %{playlists: playlists}) do
    %{data: render_many(playlists, PlaylistView, "playlist.json")}
  end

  def render("show.json", %{playlist: playlist}) do
    %{data: render_one(playlist, PlaylistView, "playlist.json")}
  end

  def render("playlist.json", %{playlist: playlist}) do
    %{id: playlist.id,
      title: playlist.title}
  end
end
