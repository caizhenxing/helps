<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
    <xsl:template match="/">
        <html>
        <head>
        <title>Book Store</title>
        </head>
        
        <body>
        <h2 align="center">Book Store</h2>
        <xsl:apply-templates select="books"/>
        
        </body>
        </html>
    </xsl:template>
    <xsl:template match="books">
        <table border="1" cellpadding="0" align="center">
            <tr>
                <th>Name</th>
                <th>Author</th>
            </tr>
            <xsl:for-each select="book">
                <tr>
                    <td><xsl:value-of  select="name"/></td>
                    <td><xsl:value-of  select="author"/></td>
                </tr>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>

