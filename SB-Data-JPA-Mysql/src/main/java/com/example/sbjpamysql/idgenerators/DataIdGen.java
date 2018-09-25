package com.example.sbjpamysql.idgenerators;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class DataIdGen implements IdentifierGenerator{

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object)
	        throws HibernateException {

	    //String prefix = "cli";
	    Connection connection = session.connection();

	    try {
	        Statement statement= connection.createStatement();

	        ResultSet rs= statement.executeQuery("select max(user_id) as Id from test.users");

	        if(rs.next())
	        {
	            int id=rs.getInt(1)+1;
	            return id;
	        }
	    } catch (SQLException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    }

	    return null;
	}
}
