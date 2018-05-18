package com.ssms.vo;

public class Node {
	
	private String node_name;
	private int node_type;
	private int max_num;
	private int limit_num;
	private String limit_type;
	
	public String getNode_name() {
		return node_name;
	}
	public void setNode_name(String node_name) {
		this.node_name = node_name;
	}
	public int getNode_type() {
		return node_type;
	}
	public void setNode_type(int node_type) {
		this.node_type = node_type;
	}
	public int getMax_num() {
		return max_num;
	}
	public void setMax_num(int max_num) {
		this.max_num = max_num;
	}
	public int getLimit_num() {
		return limit_num;
	}
	public void setLimit_num(int limit_num) {
		this.limit_num = limit_num;
	}
	public String getLimit_type() {
		return limit_type;
	}
	public void setLimit_type(String limit_type) {
		this.limit_type = limit_type;
	}
	
}
