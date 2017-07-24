# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :songbuzz,
  ecto_repos: [Songbuzz.Repo]

# Configures the endpoint
config :songbuzz, Songbuzz.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "DJstLzuN7K+S7nB7wlkc/oNfAooKTAM7Yt6bZLwDFEWlLvW20d3wOctk3vBdTEAv",
  render_errors: [view: Songbuzz.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Songbuzz.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
