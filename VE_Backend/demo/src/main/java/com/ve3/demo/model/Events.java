package com.ve3.demo.model;

import java.util.List;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_events")
public class Events {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	

	private LocalDateTime datetime;
	private String location;
	private String description;
	private String Image;
	
	
//	@ManyToOne
//	@JoinColumn(name = "user_id") 
//	private User user;
	
	@JsonManagedReference(value = "eventr")
	@OneToMany(mappedBy = "event")
	private List<Enrollments> enrollments;
	

}
