package com;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import com.Payment;


@WebServlet("/PaymentsAPI")
public class paymentsAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	
	Payment paymentObj = new Payment();
    /**
     * Default constructor. 
     */
    public paymentsAPI() {
        // TODO Auto-generated constructor stub
    	
    	super();
    }

	
	

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	
	
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
			{
			
			
			String output =  paymentObj.insertPayment(request.getParameter("paymentCode"),
			request.getParameter("paymentName"),
			request.getParameter("amount"),
			request.getParameter("paymentDesc"));
			response.getWriter().write(output);
			}
	
	
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
			{
			Map paras = getParasMap(request);
			String output = paymentObj.updatePayment(paras.get("hidPaymentIDSave").toString(),
			paras.get("paymentCode").toString(),
			paras.get("paymentName").toString(),
			paras.get("amount").toString(),
			paras.get("paymentDesc").toString());
			response.getWriter().write(output);
			}
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
			{
			Map paras = getParasMap(request);
			String output = paymentObj.deletePayment(paras.get("paymentID").toString());
			response.getWriter().write(output);
			}
	
	
	
	private static Map getParasMap(HttpServletRequest request)
	{
	Map<String, String> map = new HashMap<String, String>();
	try
	{
	Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
	String queryString = scanner.hasNext() ?
	scanner.useDelimiter("\\A").next() : "";
	scanner.close();
	String[] params = queryString.split("&");
	for (String param : params)
	{
		String[] p = param.split("=");
		map.put(p[0], p[1]);
		}
		}
		catch (Exception e)
		{
		}
		return map;
		}
}
