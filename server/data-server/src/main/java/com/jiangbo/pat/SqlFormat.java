package com.jiangbo.pat;

import java.util.HashMap;
import java.util.Map;

import com.honglian.core.db.ISqlFormat;

public class SqlFormat implements ISqlFormat{

	private Map<String,String> dbs = new HashMap<String,String>();
	
	public SqlFormat() {
		dbs.put("`core`.", "`ybg-patrol-core`.");
		dbs.put("core.", "`ybg-patrol-core`.");
	}
	@Override
	public String format(String source) {
		
		String target = source;
		for(String key : dbs.keySet()) {
			target = target.replaceAll(key, dbs.get(key));
		}
		return target;
	}

	
}
