import Box from "@mui/material/Box";
import { IRoleCard } from "../type/role";
import RoleCard from "./RoleCard";

type Props = {
    roles: IRoleCard[];
}
export default function RoleCardList( { roles }: Props ) {
    return (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </Box>
      );
}