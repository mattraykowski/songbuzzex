defmodule Songbuzz.Web.Router do
  use Songbuzz.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :graphql do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
    plug Songbuzz.Web.Context
  end

  scope "/api", Songbuzz.Web do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/playlists", PlaylistController, except: [:new, :edit]
  end

  scope "/graph" do
    pipe_through :graphql
    forward "/", Absinthe.Plug,
      schema: Songbuzz.Schema
  end

  forward "/graphiql", Absinthe.Plug.GraphiQL,
    schema: Songbuzz.Schema

  scope "/", Songbuzz.Web do
    pipe_through :browser # Use the default browser stack

    get "/*app", PageController, :index
  end
end
