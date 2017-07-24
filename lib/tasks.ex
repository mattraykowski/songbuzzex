defmodule Tasks do
  def migrate do
    {:ok, _} = Application.ensure_all_started(:songbuzz)

    path = Application.app_dir(:web, "priv/repo/migrations")

    Ecto.Migrator.run(Songbuzz.Repo, path, :up, all: true)
  end
end
