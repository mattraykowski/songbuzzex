defmodule Songbuzz.Web.Context do
  @moduledoc """
  Adds Guardian user information to the Absinthe context. Allows for authorization of
  the GraphQL APIs.
  """
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    case Guardian.Plug.current_resource(conn) do
      nil -> conn
      user -> put_private(conn, :absinthe, %{context: %{current_user: user}})
    end
  end
end
