import { Link } from "react-router-dom"
import {UserPermitButton, UserPermittedButton } from "./UserPermitButton"



export const UserTable = (props)=>{
    //table-responsiveとすることで、モバイル対応のテーブルになる
    return<div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                    <th>Valid</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.users.map(user => 
                    <tr>
                        <td>
                            <Link to = {`/admin/user/${user.userId}`}>
                                {user.userId}
                            </Link>
                        </td>
                        <td>{user.name}</td>
                        <td>{user.createdAt}</td>
                        <td>{user.updatedAt}</td>
                        <td>
                            {user.valid ?
                                "有効"
                            :
                                "無効"
                            }
                        </td>
                        <td><UserPermitButton user={user}/></td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}