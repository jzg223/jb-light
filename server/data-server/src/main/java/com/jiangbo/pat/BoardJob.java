package com.jiangbo.pat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.dashan.artmis.core.MinuteExecuter;
import com.dashan.artmis.core.TakeTool;
import com.honglian.core.db.AppContext;
import com.honglian.core.db.IBaseDAO;
import com.honglian.core.util.SSResource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class BoardJob {

	// 间隔
	private int interval = 0;

	public BoardJob() {

		JSONObject request = new JSONObject();
		request.put("userId", "admin");
		request.put("pageSize", 1000);

		JSONObject json = new JSONObject();
		JSONArray array = new JSONArray();
		array.add(131588);
		array.add(131585);
		array.add(131586);
		json.put("eventTypes", array);
		// String url = SSResource.getEnvConfig("artemis.properties",
		// "notifyUrl")
		// json.put("eventDest",
		// "http://24.134.8.120:8081/api/anon/area/event.do");
		// json.put("subType", 0);

		String url = SSResource.getEnvConfig("artemis.properties", "notifyUrl");
		json.put("eventDest", url);
		System.err.println("订阅地址" + url);
		json.put("subType", 0);

		// // "startTime": "2018-05-21T12:00:00+08:00",
		// // "endTime": "2018-05-21T12:00:00+08:00",
		// request.put("startTime", df.format(date_begin));
		// request.put("endTime", df.format(date_end));
		// request.put("vehicleOut", type);
		// "receiveStartTime": "2018-05-21T12:00:00+08:00",
		// "receiveEndTime": "2018-05-21T12:00:00+08:00",
		
		Runnable r = new Runnable(){

			@Override
			public void run() {
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				// TODO Auto-generated method stub
				String content = null;
				try {
					content = new TakeTool().execute(
							"/api/eventService/v1/eventSubscriptionByEventTypes",
							json.toString());
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
				
		};
		new Thread(r).start();
		
		
	}

	public void execute() {

		System.err.println(this.interval+" ,, 执行任务 "+new Date());
		IBaseDAO baseDAO = AppContext
				.getService("boardBaseDAO", IBaseDAO.class);
		List<MinuteExecuter> executers = new ArrayList<MinuteExecuter>();
		// 车辆
		executers.add(new com.dashan.artmis.car.CurrentProcesser(interval,
				baseDAO));

		// 门禁
		executers.add(new com.dashan.artmis.reader.StateExecuter(interval,
				baseDAO));
		
		//摄像头
		executers.add(new com.dashan.artmis.camera.CurrentProcesser(interval,
				baseDAO));

		for (MinuteExecuter executer : executers) {
			try {
				executer.execute();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;

//		Runnable runa = new Runnable() {
//
//			@Override
//			public void run() {
//				
//				IBaseDAO baseDAO = AppContext
//						.getService("boardBaseDAO", IBaseDAO.class);
//				List<MinuteExecuter> executers = new ArrayList<MinuteExecuter>();
//				// 车辆
//				executers.add(new com.dashan.artmis.car.HisProcesser(interval,
//						baseDAO));
//
//				// 门禁
//				executers.add(new com.dashan.artmis.reader.LastStateExecuter(interval,
//						baseDAO));
//
//				for (MinuteExecuter executer : executers) {
//					try {
//						executer.execute();
//					} catch (Exception e) {
//						// TODO Auto-generated catch block
//						e.printStackTrace();
//					}
//				}
//			}
//
//		};
//		new Thread(runa).start();
	}

}
