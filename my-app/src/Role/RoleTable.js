import React from 'react'
import './roletable.css'

function RoleTable( Users ) {
const info = Users.Users


  return (
    <div>
        
        {
            Array.isArray(info.$values) && info.$values.map((user, index) => {
                const name = user.fullName;
                const email = user.email;
                const role = user.roleName
                const id = user.id;


                return (
                    <tbody>
                    <tr key={index}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                    </tr>
                    </tbody>
                )
            })
        }

    </div>
  )
}

export default RoleTable