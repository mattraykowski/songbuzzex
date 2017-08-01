defmodule Songbuzz.Repo.Migrations.AddPasswordHashToAccountsUsers do
  use Ecto.Migration

  def change do
    alter table(:accounts_users) do
      add :password_hash, :string
    end
  end
end
