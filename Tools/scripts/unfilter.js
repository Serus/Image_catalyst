/*
������ �� �������� ������ ������ ����: 
<������ ���� � �����>	[<��� �����>]

���� <��� �����> �� ������, �� ������ ������������ � �������� ���������.
���� ������, �� ���� �������� � <������ ���� � �����> ����������������� � <��� �����>.
*/

var str, str1, astr;
var fso = new ActiveXObject("Scripting.FileSystemObject");
while (!WScript.StdIn.AtEndOfStream) {
	str = sDOS2Win(WScript.StdIn.ReadLine(),false);
	astr = str.split("\t");
	if(astr.length > 1) {
		str = fso.GetParentFolderName(str) + "\\" + astr[1];
		if(fso.FileExists(astr[0]) && !fso.FileExists(str)) 
			try {
				fso.MoveFile(astr[0],str);
			} catch(e) {
				WScript.echo(e);
				WScript.echo("MoveFile("+astr[0]+","+str+")");
			}
}}
WScript.Quit(0);

function GetCharCodeHexString(sText) {
	var j, str1="";
	for(j=0;j<sText.length;++j) str1 += " " + sText.charCodeAt(j).toString(16);
	return str1.substr(1);
}

/*	���������� ����� sText ��������������� �� ��������� cp866 (DOS) � windows-1251. 
	��� �������� - �� 1251 � DOS - ���� ���� bInsideOut ����� true.
	�����: http://forum.script-coding.com/viewtopic.php?id=997
*/

function sDOS2Win(sText, bInsideOut) {
	var aCharsets = ["windows-1251", "cp866"];
	sText += "";
	bInsideOut = bInsideOut ? 1 : 0;
	with (new ActiveXObject("ADODB.Stream")) { //http://www.w3schools.com/ado/ado_ref_stream.asp
		type = 2; //Binary 1, Text 2 (default) 
		mode = 3; //Permissions have not been set 0,	Read-only 1,	Write-only 2,	Read-write 3,
		//Prevent other read 4,	Prevent other write 8,	Prevent other open 12,	Allow others all 16
		charset = aCharsets[bInsideOut];
		open();
		writeText(sText);
		position = 0;
		charset = aCharsets[1 - bInsideOut];
		return readText();
	}
}
