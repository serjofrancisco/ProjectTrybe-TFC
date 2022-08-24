import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  declare id: number;

  declare homeTeam: number;

  declare homeTeamGoals: number;

  declare awayTeam: number;

  declare awayTeamGoals: number;

  declare inProgress: number;
}

Matches.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      type: DataTypes.INTEGER,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
    },
    awayTeam: {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      type: DataTypes.INTEGER,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
    },
    inProgress: {
      type: DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);
Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });

Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatches' });

Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
