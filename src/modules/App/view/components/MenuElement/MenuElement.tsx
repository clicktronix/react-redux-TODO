import * as block from 'bem-cn';
import * as React from 'react';
import * as InlineSvg from 'svg-inline-react';
import { bind } from 'decko';
import { Button } from 'react-toolbox/lib/button';
import { ListItem } from 'react-toolbox/lib/list';
import { Link } from 'react-router-dom';
import { editIcon, deleteIcon, moreVertIcon, listIcon } from 'shared/view/img';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import { ITaskList } from 'shared/types/model';
import DeleteItemDialog from 'shared/view/components/DeleteItemDialog/DeleteItemDialog';
import Input from 'react-toolbox/lib/input';
import './MenuElement.styl';

const b = block('menu-element');

interface IProps {
  taskList: ITaskList;
  deleteTaskList(taskListId: string): void;
  updateTaskList({ taskListId, title }: { taskListId: string; title: string; }): void;
}

interface IState {
  isEditing: boolean;
  taskListTitle: string;
  deletingTaskDialogShow: boolean;
}

export default class MenuElement extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isEditing: false,
    taskListTitle: this.props.taskList.title,
    deletingTaskDialogShow: false,
  };

  public render(): JSX.Element {
    return(
      <div className={b('menu-list')()}>
          {
            !this.state.isEditing ?
            (
              <Link to={this.props.taskList.id} className={b('menu-section')()}>
                <ListItem
                  leftIcon={<InlineSvg src={listIcon} className={b('icon')()} element="div" />}
                  caption={this.props.taskList.title}
                  className={b('list-title')()}
                />
              </Link>
            ) : (
              <div className={b('edit-menu-section')()}>
                <Input
                  type="text"
                  label="Enter your task title"
                  name="task title"
                  value={this.state.taskListTitle}
                  onChange={this.editingHandle}
                  maxLength={50}
                />
                <Button
                  label="Save"
                  onClick={this.saveTaskListTitle}
                />
                <Button
                  label="Cancel"
                  onClick={this.editTaskListToggle}
                />
              </div>
            )
          }
          <IconMenu
            icon={<InlineSvg src={moreVertIcon} className={b('icon-vert')()} element="div" />}
            position="topRight"
            menuRipple
          >
            <MenuItem
              icon={<InlineSvg src={editIcon} className={b('icon')()} element="div" />}
              caption="Edit"
              onClick={this.editTaskListToggle}
            />
            <MenuItem
              icon={<InlineSvg src={deleteIcon} className={b('icon')()} element="div" />}
              caption="Delete"
              onClick={this.dialogToggle}
            >
              <DeleteItemDialog
                listId={this.props.taskList.id}
                deletingDialogShow={this.state.deletingTaskDialogShow}
                dialogToggle={this.dialogToggle}
                deleteTaskList={this.props.deleteTaskList}
              />
            </MenuItem>
          </IconMenu>
        </div>
    );
  }

  @bind
  private editTaskListToggle(): void {
    this.setState({ isEditing: !this.state.isEditing });
  }

  @bind
  private saveTaskListTitle(): void {
    this.props.updateTaskList({
      taskListId: this.props.taskList.id,
      title: this.state.taskListTitle,
    });
    this.editTaskListToggle();
  }

  @bind
  private dialogToggle(): void {
    this.setState({ deletingTaskDialogShow: !this.state.deletingTaskDialogShow });
  }

  @bind
  private editingHandle(e: string): void {
    this.setState({
      taskListTitle: e,
    });
  }
}
