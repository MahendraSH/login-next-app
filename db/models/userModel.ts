import { DataTypes, Model, Optional } from "sequelize";
import sequelizeDB from "@/db/sequelize";
import Roles from "@/constants/Roles";

// Define the type for the User's attributes (fields)
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Roles; //
}

// Optional attributes are the ones that can be omitted when creating a new user
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role"> {}

class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: Roles; //
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(Roles)),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize: sequelizeDB,
    tableName: "user",
  }
);

export default UserModel;
