import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { IPerson } from 'types/types'

import styles from './styles.module.scss'

interface Props {
  persons: IPerson[]
}

export default (props: Props) => (
  <TableContainer component={Paper}>
    <Table className={styles.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>First name</TableCell>
          <TableCell>Last name</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.persons &&
          props.persons.map((person: IPerson) => (
            <TableRow key={person.email} className={styles.row}>
              <TableCell component="th" scope="row">
                {person.firstName}
              </TableCell>
              <TableCell>{person.lastName}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.email}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
)
