import React, { useContext, useEffect, useState } from "react";
import "../styles/AdminUsers.css";
import { AuthContext } from "../context/AuthContext";
import { FaUsers, FaUserShield, FaSearch } from "react-icons/fa";

const AdminUsers = () => {

    const { user } = useContext(AuthContext);

    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchUsers();

    }, []);

    useEffect(() => {

        setFilteredUsers(

            users.filter((u) =>
                u.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                u.email
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )

        );

    }, [search, users]);

    const fetchUsers = async () => {

        try {

            const res = await fetch("/api/auth/users", {

                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

            });

            const data = await res.json();

            if (!res.ok) {

                throw new Error(data.message);

            }

            setUsers(data);

            setFilteredUsers(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="admin-users-loading">
                Loading Users...
            </div>
        );

    }

    return (

        <div className="admin-users-page">

            <div className="users-header">

                <div>

                    <h1>Users</h1>

                    <p>
                        Manage registered users
                    </p>

                </div>

                <div className="users-stats">

                    <div className="stat-box">

                        <FaUsers />

                        <span>

                            {users.length}

                        </span>

                        <small>Total</small>

                    </div>

                    <div className="stat-box">

                        <FaUserShield />

                        <span>

                            {
                                users.filter(
                                    (u) =>
                                        u.role === "admin"
                                ).length
                            }

                        </span>

                        <small>Admins</small>

                    </div>

                </div>

            </div>

            <div className="search-box">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            {error &&

                <div className="error-box">

                    {error}

                </div>

            }

            <div className="users-table">

                <table>

                    <thead>

                        <tr>

                            <th>User</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Joined</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map((u) => (

                            <tr key={u._id}>

                                <td>

                                    <div className="user-info">

                                        <div className="avatar">

                                            {u.name.charAt(0).toUpperCase()}

                                        </div>

                                        <div>

                                            <h4>

                                                {u.name}

                                            </h4>

                                            <small>

                                                {u._id.slice(0,8)}...

                                            </small>

                                        </div>

                                    </div>

                                </td>

                                <td>

                                    {u.email}

                                </td>

                                <td>

                                    <span
                                        className={
                                            u.role === "admin"
                                            ? "admin-badge"
                                            : "user-badge"
                                        }
                                    >

                                        {u.role}

                                    </span>

                                </td>

                                <td>

                                    {new Date(
                                        u.createdAt
                                    ).toLocaleDateString()}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default AdminUsers;