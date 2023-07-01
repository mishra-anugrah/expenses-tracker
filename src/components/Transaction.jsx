import { Delete, Edit } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedTransaction } from "../store/transactionsSlice";
import { sagaActions } from "../store/sagaActions";

export const Transaction = (props) => {
  const { transaction, setShowExpenseForm } = props;
  const { isExpense, title, amount, category, date, time, id, description } =
    transaction;

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);

  const dispatch = useDispatch();

  const onEditClick = () => {
    dispatch(setSelectedTransaction(transaction));
    setShowExpenseForm(true);
  };

  const onDeleteConfirmation = () => {
    dispatch({ type: sagaActions.DELETE_TRANSACTION, payload: transaction });
  };

  const onDeleteButtonClick = () => {
    setShowDeleteConfirmation(true);
  };

  return (
    <div>
      <ListItem>
        <Card
          className={`transaction-item ${
            isExpense ? "expense-item" : "income-item"
          } transaction-card`}
        >
          <div className="card-controls">
            <IconButton onClick={() => onEditClick(id)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDeleteButtonClick()}>
              <Delete />
            </IconButton>
          </div>
          <CardContent>
            <Backdrop
              open={showDeleteConfirmation}
              className="delete-confirmation"
            >
              <div className="delete-confirmation__content">
                Are you sure to delete?
                <div>
                  <Button variant="outlined" onClick={onDeleteConfirmation}>
                    Yes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setShowDeleteConfirmation(false)}
                  >
                    No
                  </Button>
                </div>
              </div>
            </Backdrop>
            <Typography variant="h5">{title}</Typography>

            <Typography variant="h6">{`${
              isExpense ? "-" : "+"
            }${amount}`}</Typography>
            <Divider />
            <Chip
              label={category}
              variant="outlined"
              className={`${
                isExpense ? "expense" : "income"
              }-category transaction-category`}
            />
            <Typography>{description}</Typography>
            <Typography
              className="transaction-date-time"
              sx={{ px: 1 }}
            >{`${date} : ${time}`}</Typography>
          </CardContent>
        </Card>
      </ListItem>
    </div>
  );
};
