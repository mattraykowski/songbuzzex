defmodule Songbuzz.Web.PlaylistControllerTest do
  use Songbuzz.Web.ConnCase

  alias Songbuzz.Music
  alias Songbuzz.Music.Playlist

  @create_attrs %{title: "some title"}
  @update_attrs %{title: "some updated title"}
  @invalid_attrs %{title: nil}

  def fixture(:playlist) do
    {:ok, playlist} = Music.create_playlist(@create_attrs)
    playlist
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, playlist_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "creates playlist and renders playlist when data is valid", %{conn: conn} do
    conn = post conn, playlist_path(conn, :create), playlist: @create_attrs
    assert %{"id" => id} = json_response(conn, 201)["data"]

    conn = get conn, playlist_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "title" => "some title"}
  end

  test "does not create playlist and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, playlist_path(conn, :create), playlist: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates chosen playlist and renders playlist when data is valid", %{conn: conn} do
    %Playlist{id: id} = playlist = fixture(:playlist)
    conn = put conn, playlist_path(conn, :update, playlist), playlist: @update_attrs
    assert %{"id" => ^id} = json_response(conn, 200)["data"]

    conn = get conn, playlist_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "title" => "some updated title"}
  end

  test "does not update chosen playlist and renders errors when data is invalid", %{conn: conn} do
    playlist = fixture(:playlist)
    conn = put conn, playlist_path(conn, :update, playlist), playlist: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen playlist", %{conn: conn} do
    playlist = fixture(:playlist)
    conn = delete conn, playlist_path(conn, :delete, playlist)
    assert response(conn, 204)
    assert_error_sent 404, fn ->
      get conn, playlist_path(conn, :show, playlist)
    end
  end
end
