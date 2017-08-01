defmodule Songbuzz.Repo.Migrations.CreateSongbuzz.Accounts.User do
  use Ecto.Migration

  def change do
    create table(:accounts_users) do
      add :email, :string
      add :first_name, :string
      add :last_name, :string

      timestamps()
    end

  end
end
