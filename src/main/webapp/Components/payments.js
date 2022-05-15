$(document).ready(function()
{
	$("#alertSuccess").hide();
	$("#alertError").hide();
});



$(document).on("click", "#btnSave", function(event)
{
// Clear alerts---------------------
$("#alertSuccess").text("");
$("#alertSuccess").hide();
$("#alertError").text("");
$("#alertError").hide();
// Form validation-------------------
var status = validatePaymentForm();
if (status != true)
{
$("#alertError").text(status);
$("#alertError").show();
return;
}
// If valid------------------------
var type = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT";
$.ajax(
{
url : "PaymentsAPI",
type : type,
data : $("#formPayment").serialize(),
dataType : "text",
complete : function(response, status)
{
onPaymentSaveComplete(response.responseText, status);
}
});
});



function onPaymentSaveComplete(response, status)
{
if (status == "success")
{
var resultSet = JSON.parse(response);
if (resultSet.status.trim() == "success")
{
$("#alertSuccess").text("Successfully saved.");
$("#alertSuccess").show();
$("#divItemsGrid").html(resultSet.data);
} else if (resultSet.status.trim() == "error")
{
$("#alertError").text(resultSet.data);
$("#alertError").show();
}
} else if (status == "error")
{
$("#alertError").text("Error while saving.");
$("#alertError").show();
} else
{
$("#alertError").text("Unknown error while saving..");
$("#alertError").show();
}
$("#hidPaymentIDSave").val("");
$("#formPayment")[0].reset();
}

$(document).on("click", ".btnUpdate", function(event)
{
$("#hidPaymentIDSave").val($(this).data("paymentid"));
$("#paymentCode").val($(this).closest("tr").find('td:eq(0)').text());
$("#paymentName").val($(this).closest("tr").find('td:eq(1)').text());
$("#amount").val($(this).closest("tr").find('td:eq(2)').text());
$("#paymentDesc").val($(this).closest("tr").find('td:eq(3)').text());
});


$(document).on("click", ".btnRemove", function(event)
{
$.ajax(
{
url : "PaymentsAPI",
type : "DELETE",
data : "paymentID=" + $(this).data("paymentid"),
dataType : "text",
complete : function(response, status)
{
onPaymentDeleteComplete(response.responseText, status);
}
});
});


function onPaymentDeleteComplete(response, status)
{
if (status == "success")
{
var resultSet = JSON.parse(response);
if (resultSet.status.trim() == "success")
{
$("#alertSuccess").text("Successfully deleted.");
$("#alertSuccess").show();
$("#divPaymentGrid").html(resultSet.data);
} else if (resultSet.status.trim() == "error")
{
$("#alertError").text(resultSet.data);
$("#alertError").show();
}
} else if (status == "error")
{
$("#alertError").text("Error while deleting.");
$("#alertError").show();
} else
{
$("#alertError").text("Unknown error while deleting..");
$("#alertError").show();
}
}
