package com.ve3.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="admin_tbl")
public class Admin {
	
	@Id
	private String adminEmail;
	private String adminPassword;
	
	

}
