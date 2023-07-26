package com.jiangbo.pat.tool;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.honglian.core.db.IBaseDAO;
import com.honglian.core.db.tool.SqlEntry;
import com.honglian.core.db.tool.SqlTool;

//任务生成
public class TaskGenerater {

	private IBaseDAO baseDAO;

	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");

	public TaskGenerater(IBaseDAO baseDAO) {
		this.baseDAO = baseDAO;
	}

	public void execute() {

		String select = "select p.* from pat_plan p ";

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		int weekIdx = calendar.get(Calendar.DAY_OF_WEEK) - 1;

		Date today = new Date();

		List<Map<String, Object>> plans = baseDAO.query(select, null);
		if (null == plans) {
			return;
		}

		baseDAO.executeUpdate("delete from pat_task where recordDay=?", new Object[] { df.format(today) });
		
		for (Map<String, Object> row : plans) {
			String xq = row.get("xq") + "";

			if (null != xq && false == "".equals(xq)) {
				if (xq.indexOf(weekIdx + "") == -1) {
					continue;
				}
			}

			Object jsrq =  row.get("jsrq");
			if (null != jsrq && false == "".equals(jsrq)) {
				long value = 0;
				try {
					value = df.parse(""+jsrq).getTime();
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				if (today.getTime() >= value) {
					continue;
				}
			}
			Object ksrq =  row.get("ksrq");
			if (null != ksrq && false == "".equals(ksrq)) {
				long value_ = 0;
				try {
					value_ = df.parse(""+ksrq).getTime();
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				if (today.getTime() <= value_) {
					continue;
				}
			}

			

			List<Map<String, Object>> points = baseDAO.query("select * from pat_line_point where lineId=?", new Object[]{row.get("lineId")});
			StringBuffer buffer = new StringBuffer("0");
			if(null != points){
				for(Map<String, Object> map:points){
					buffer.append(","+map.get("pointId"));
				}
			}
			Map<String, Object> info = new HashMap<>();
			info.put("planId", row.get("id"));
			info.put("lineId", row.get("lineId"));
			info.put("pointIds", buffer.toString());
			
			List<Map<String, Object>> users = baseDAO.query("select * from pat_post_user where postId=?", new Object[]{row.get("postId")});
			buffer = new StringBuffer("0");
			if(null != users){
				for(Map<String, Object> map:users){
					buffer.append(","+map.get("userId"));
				}
			}
			info.put("userIds", buffer.toString());
			
			info.put("status", 0);
			info.put("recordDay", df.format(new Date()));
			info.put("postId", row.get("xjgw"));
			info.put("createdTime", new Date().getTime() / 1000);
			SqlEntry sqlEntry = new SqlTool().generateInsertSql("pat_task", info);
			baseDAO.executeUpdate(sqlEntry.sql, sqlEntry.params);

		}
	}
}
