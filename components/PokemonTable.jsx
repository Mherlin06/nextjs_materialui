import * as React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

// Material UI
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

// Data
import { getFrenchAbilityName } from "../src/pokemonData";
import TypeIcon from "./Icons/TypeIcon";

// Table
const PokemonTable = ({ pokemonData }) => {
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // Table Header
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell sortDirection={orderBy === "pokedexEntry" ? order : false}>
            <TableSortLabel
              active={orderBy === "pokedexEntry"}
              direction={orderBy === "pokedexEntry" ? order : "asc"}
              onClick={createSortHandler("pokedexEntry")}
              align="center"
            >
              N°
              {orderBy === "pokedexEntry" ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell align="center" padding="none">
            Sprite
          </TableCell>
          <TableCell align="center" padding="none">
            Nom
          </TableCell>
          <TableCell align="center" padding="none">
            Types
          </TableCell>
          <TableCell align="center" padding="none">
            Talents
          </TableCell>
          <TableCell
            padding="none"
            sortDirection={orderBy === "hp" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "hp"}
              direction={orderBy === "hp" ? order : "asc"}
              onClick={createSortHandler("hp")}
            >
              PV
              {orderBy === "hp" ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell
            padding="none"
            sortDirection={orderBy === "attack" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "attack"}
              direction={orderBy === "attack" ? order : "asc"}
              onClick={createSortHandler("attack")}
            >
              Atk
              {orderBy === "attack" ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell
            padding="none"
            sortDirection={orderBy === "defense" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "defense"}
              direction={orderBy === "defense" ? order : "asc"}
              onClick={createSortHandler("defense")}
            >
              Déf
              {orderBy === "defense" ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell
            padding="none"
            sortDirection={orderBy === "specialAttack" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "specialAttack"}
              direction={orderBy === "specialAttack" ? order : "asc"}
              onClick={createSortHandler("specialAttack")}
            >
              Atk Spé
              {orderBy === "specialAttack" ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell
            padding="none"
            sortDirection={orderBy === "specialDefense" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "specialDefense"}
              direction={orderBy === "specialDefense" ? order : "asc"}
              onClick={createSortHandler("specialDefense")}
            >
              Déf Spé
              {orderBy === "specialDefense" ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          <TableCell
            padding="none"
            sortDirection={orderBy === "speed" ? order : false}
          >
            <TableSortLabel
              active={orderBy === "speed"}
              direction={orderBy === "speed" ? order : "asc"}
              onClick={createSortHandler("speed")}
            >
              Vit
              {orderBy === "speed" ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  // Table Body
  function EnhancedTable() {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("pokedexEntry");

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              stickyHeader
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(pokemonData, getComparator(order, orderBy)).map(
                  (pokemon, index) => {
                    return (
                      <TableRow
                        tabIndex={-1}
                        key={pokemon.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        padding="none"
                      >
                        <TableCell component="th" scope="pokemon">
                          {pokemon.pokedexEntry}
                        </TableCell>
                        <TableCell align="center" padding="none">
                          {pokemon.miniSprite ? (
                            <Image
                              src={pokemon.miniSprite}
                              alt={pokemon.frenchName}
                              width={75}
                              height={75}
                            />
                          ) : (
                            <Image
                              src={"/default-mini-sprite.png"}
                              alt={"default"}
                              width={75}
                              height={75}
                            />
                          )}
                        </TableCell>
                        <TableCell padding="none">
                          <List>
                            <ListItem>
                              <ListItemText
                                primary={pokemon.frenchName}
                                secondary={pokemon.name}
                                align="center"
                                padding="none"
                              />
                            </ListItem>
                          </List>
                        </TableCell>
                        <TableCell align="center">
                          {pokemon.types.map((type) => (
                            <div key={type}>
                              <TypeIcon type={type} />
                              <br />
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>
                          <List dense>
                            {pokemon.abilities.map((ability, index) => {
                              let frenchAbility = getFrenchAbilityName(ability);
                              return (
                                <Link
                                  href={`/talent/${frenchAbility}`}
                                  key={ability + index}
                                  underline="hover"
                                  variant="inherit"
                                  color="inherit"
                                >
                                  <ListItem>
                                    <ListItemText
                                      primary={frenchAbility}
                                      align="center"
                                      padding="none"
                                    />
                                  </ListItem>
                                </Link>
                              );
                            })}
                          </List>
                        </TableCell>
                        <TableCell padding="none">{pokemon.hp}</TableCell>
                        <TableCell padding="none">{pokemon.attack}</TableCell>
                        <TableCell padding="none">{pokemon.defense}</TableCell>
                        <TableCell padding="none">
                          {pokemon.specialAttack}
                        </TableCell>
                        <TableCell padding="none">
                          {pokemon.specialDefense}
                        </TableCell>
                        <TableCell padding="none">{pokemon.speed}</TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
  }
  return (
    <div>
      <EnhancedTable />
    </div>
  );
};

export default PokemonTable;
