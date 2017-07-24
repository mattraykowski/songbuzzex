defmodule Songbuzz.Web.PageController do
  use Songbuzz.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
