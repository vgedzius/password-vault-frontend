import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {
  red, pink, purple, deepPurple, indigo, blue,
  lightBlue, cyan, teal, green, lightGreen, lime,
  amber, orange, deepOrange
} from '@material-ui/core/colors';

import { User } from '../servises/Users';

interface UserAvatarProps {
  user?: User;
}

class UserAvatar extends React.Component<UserAvatarProps> {
  public render() {
    const { user } = this.props;

    let initials: string = 'V';
    if (user) {
      initials = user.firstName.charAt(0).toUpperCase();
    }

    return (
      <Avatar style={this.avatarColor(initials)}>{initials}</Avatar>
    )
  }

  private avatarColor = (char: string) => {
    let color;
    switch (char) {
      case 'A':
        color = red;
        break;
      case 'B':
        color = pink;
        break;
      case 'C':
        color = purple;
        break;
      case 'D':
        color = deepPurple;
        break;
      case 'E':
        color = indigo;
        break;
      case 'F':
        color = blue;
        break;
      case 'G':
        color = lightBlue;
        break;
      case 'H':
        color = cyan;
        break;
      case 'I':
        color = teal;
        break;
      case 'J':
        color = green;
        break;
      case 'K':
        color = lightGreen;
        break;
      case 'L':
        color = lime;
        break;
      case 'M':
        color = amber;
        break;
      case 'N':
        color = orange;
        break;
      case 'O':
        color = deepOrange;
        break;
      case 'P':
        color = red;
        break;
      case 'Q':
        color = pink;
        break;
      case 'R':
        color = purple;
        break;
      case 'S':
        color = indigo;
        break;
      case 'T':
        color = blue;
        break;
      case 'U':
        color = lightBlue;
        break;
      case 'V':
        color = cyan;
        break;
      case 'W':
        color = teal;
        break;
      case 'X':
        color = green;
        break;
      case 'Y':
        color = lightGreen;
        break;
      case 'Z':
        color = lime;
        break;
      default:
        color = green;
    }

    return {
      backgroundColor: color[400],
    }
  }
}

export default UserAvatar;