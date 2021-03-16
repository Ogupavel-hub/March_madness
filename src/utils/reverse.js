import { generatePath } from "react-router";
import { RoutesNames } from "src/constants";

export const reverse = (name, params) => {
    return generatePath(RoutesNames[name], params)
}
