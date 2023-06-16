import { Dialect, Sequelize } from 'sequelize';

const sequelize = new Sequelize('teste_full_stack', 'postgres', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres' as Dialect,
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelize;
